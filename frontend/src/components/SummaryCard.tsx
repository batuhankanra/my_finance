interface Props {
  title: string;
  amount: number;
  variant: 'balance' | 'income' | 'expense';
}

const variantStyles: Record<Props['variant'], string> = {
  balance: 'text-blue-600 bg-blue-50',
  income: 'text-green-600 bg-green-50',
  expense: 'text-red-600 bg-red-50',
};

export default function SummaryCard({ title, amount, variant }: Props) {
  const formatted = amount.toLocaleString('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  });

  return (
    <div className={`rounded-xl p-5 shadow-sm ${variantStyles[variant]}`}>
      <p className="text-sm font-medium opacity-80">{title}</p>
      <p className="text-2xl font-bold mt-1">{formatted}</p>
    </div>
  );
}