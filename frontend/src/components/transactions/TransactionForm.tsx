
import { useState, type FormEvent } from 'react';
import { useAppDispatch } from '../../store/hook';
import { addTransAction } from '../../store/slices/transactions';

interface Props {
  type: TransactionType;
}

export default function TransactionForm({ type }: Props) {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amount || !category) return;

    dispatch(
      addTransAction({
        type,
        amount: Number(amount),
        category,
        description,
        date,
      })
    );

    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-white p-4 rounded-lg shadow">
      <input
        type="number"
        placeholder="Tutar"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <input
        type="text"
        placeholder="Kategori"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <button
        type="submit"
        className={`rounded px-3 py-2 text-white ${type === 'income' ? 'bg-green-600' : 'bg-red-600'}`}
      >
        {type === 'income' ? 'Gelir Ekle' : 'Gider Ekle'}
      </button>
    </form>
  );
}