import TransactionItem from './TransactionItem';

interface Props {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: Props) {
  if (transactions.length === 0) {
    return (
      <p className="text-gray-400 text-center py-8">
        Henüz kayıt yok.
      </p>
    );
  }

  // En yeni tarih en üstte
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <ul className="flex flex-col gap-2">
      {sorted.map((t) => (
        <TransactionItem key={t.id} transaction={t} />
      ))}
    </ul>
  );
}