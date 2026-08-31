import { useAppDispatch } from '../../store/hook';
import { removeTransaction } from '../../store/slices/transactions';

interface Props {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: Props) {
  const dispatch = useAppDispatch();
  const { id, type, amount, category, description, date } = transaction;

  const handleDelete = () => {
    dispatch(removeTransaction(id));
  };

  const formattedDate = new Date(date).toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const formattedAmount = amount.toLocaleString('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  });

  return (
    <li className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100">
      <div className="flex flex-col">
        <span className="font-medium text-gray-800">{category}</span>
        {description && (
          <span className="text-sm text-gray-500">{description}</span>
        )}
        <span className="text-xs text-gray-400">{formattedDate}</span>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`font-semibold ${
            type === 'income' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {type === 'income' ? '+' : '-'}
          {formattedAmount}
        </span>
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Sil"
        >
          ✕
        </button>
      </div>
    </li>
  );
}