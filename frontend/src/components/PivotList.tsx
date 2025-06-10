import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3000'); // ajuste para o backend em produção se necessário

type Pivot = {
  id: number;
  name: string;
  status: string;
  direction?: string;
  speed?: number;
  pressure?: number;
  farmId: number;
};

export const PivotList = () => {
  const [pivots, setPivots] = useState<Pivot[]>([]);

  useEffect(() => {
    // Carrega pivôs do backend
    axios.get<Pivot[]>('http://localhost:3000/pivots').then((res) => {
      setPivots(res.data);
    });

    // Escuta atualizações via WebSocket
    socket.on('pivotUpdate', (updated: Pivot) => {
      setPivots((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
    });

    return () => {
      socket.off('pivotUpdate');
    };
  }, []);

  const grouped = pivots.reduce((acc: Record<number, Pivot[]>, pivot) => {
    acc[pivot.farmId] = acc[pivot.farmId] || [];
    acc[pivot.farmId].push(pivot);
    return acc;
  }, {});

  return (
    <div>
      <h2>Pivôs por Fazenda</h2>
      {Object.entries(grouped).map(([farmId, pivots]) => (
        <div key={farmId} style={{ border: '1px solid #ccc', marginBottom: 16, padding: 12 }}>
          <h3>Fazenda #{farmId}</h3>
          <ul>
            {pivots.map((p) => (
              <li key={p.id}>
                <strong>{p.name}</strong> - Status: {p.status}, Velocidade: {p.speed}, Pressão: {p.pressure}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
