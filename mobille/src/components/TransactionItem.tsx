import { getCategoryColor, getCategoryLabel } from '@/constants/categories';
import { Transaction } from '@/types/transaction';
import { View, Text, StyleSheet } from 'react-native'

const TransactionItem = ({item}:{item:Transaction}) => {
    const color = getCategoryColor(item.type, item.category);
    const label = getCategoryLabel(item.type, item.category);
    const isIncome = item.type === 'income';
    return (
        <View style={styles.card}>
            <View style={[styles.categoryDot, { backgroundColor: color }]} />
            <View style={styles.cardContent}>
                <Text style={styles.categoryLabel}>{label}</Text>
                {!!item.description && (
                <Text style={styles.description} numberOfLines={1}>
                    {item.description}
                </Text>
                )}
                <Text style={styles.date}>
                {new Date(item.date).toLocaleDateString('tr-TR')}
                </Text>
            </View>
            <Text style={[styles.amount, { color: isIncome ? '#22C55E' : '#EF4444' }]}>
                {isIncome ? '+' : '-'}
                {item.amount.toLocaleString('tr-TR')} ₺
            </Text>
        </View> 
    )
}
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  categoryDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  cardContent: { flex: 1 },
  categoryLabel: { fontSize: 15, fontWeight: '600', color: '#1E293B' },
  description: { fontSize: 13, color: '#64748B', marginTop: 2 },
  date: { fontSize: 12, color: '#94A3B8', marginTop: 4 },
  amount: { fontSize: 15, fontWeight: '700', marginLeft: 8 },
});

export default TransactionItem