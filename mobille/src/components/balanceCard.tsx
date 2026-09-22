import { View, Text, StyleSheet } from 'react-native';

export default function BalanceCard  ({balance,totalIncome,totalExpense}:{balance:number,totalIncome:number,totalExpense:number})  {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceLabel}>Toplam Bakiye</Text>
      <Text style={styles.balanceValue}>{balance.toLocaleString('tr-TR')} ₺</Text>

      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Gelir</Text>
          <Text style={[styles.summaryValue, { color: '#22C55E' }]}>
            +{totalIncome.toLocaleString('tr-TR')} ₺
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Gider</Text>
          <Text style={[styles.summaryValue, { color: '#EF4444' }]}>
            -{totalExpense.toLocaleString('tr-TR')} ₺
          </Text>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  balanceCard: {
    backgroundColor: '#1E293B',
    margin: 16,
    borderRadius: 16,
    padding: 20,
  },
  balanceLabel: { color: '#94A3B8', fontSize: 13, marginBottom: 4 },
  balanceValue: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 16,
  },
  summaryRow: { flexDirection: 'row', alignItems: 'center' },
  summaryItem: { flex: 1 },
  summaryLabel: { color: '#94A3B8', fontSize: 12, marginBottom: 2 },
  summaryValue: { fontSize: 16, fontWeight: '600' },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: '#334155',
    marginHorizontal: 16,
  },
});