import { getCategoryColor, getCategoryLabel } from "@/constants/categories";
import { useGetTransactionsQuery } from "@/store/api/transactionApi";
import { Transaction } from "@/types/transaction";
import { router } from "expo-router";
import { ActivityIndicator, FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";



const TransactionListScreen=()=>{
    const { data, isLoading, isError, refetch } = useGetTransactionsQuery();
    if (isLoading){
        return (
            <View style={styles.centered}>
                <ActivityIndicator size={"large"} color={"#6366f1"} />
            </View>
        )
    }
    if (isError){
        return(
            <View style={styles.centered}>
                <Text style={styles.errorText} >Veriler yüklenirklen bir hata oluştu</Text>
            </View>
        )
    }
    const renderItem=({item}:{item:Transaction})=>{
        const color =getCategoryColor(item.type,item.category)
        const label= getCategoryLabel(item.type,item.category)
        const isIncome=item.type==="income"
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
        );
    };
     return (
    <View style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Toplam Bakiye</Text>
        <Text style={styles.balanceValue}>
          {data?.balance.toLocaleString('tr-TR')} ₺
        </Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Gelir</Text>
            <Text style={[styles.summaryValue, { color: '#22C55E' }]}>
              +{data?.totalIncome.toLocaleString('tr-TR')} ₺
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Gider</Text>
            <Text style={[styles.summaryValue, { color: '#EF4444' }]}>
              -{data?.totalExpense.toLocaleString('tr-TR')} ₺
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={()=>router.push("/add")} >
        <Text style={styles.addButtonText} >+Yeni işlem</Text>
      </TouchableOpacity>
      <FlatList
        data={data?.data}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onRefresh={refetch}
        refreshing={isLoading}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Henüz işlem eklenmemiş.</Text>
        }
      />
    </View>
  );
}
export default TransactionListScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  addButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 12,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 15,
  },
  balanceCard: {
    backgroundColor: '#1E293B',
    margin: 16,
    borderRadius: 16,
    padding: 20,
  },
  balanceLabel: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 4,
  },
  balanceValue: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    color: '#94A3B8',
    fontSize: 12,
    marginBottom: 2,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: '#334155',
    marginHorizontal: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
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
  categoryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  categoryLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  description: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
  },
  amount: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#94A3B8',
    marginTop: 40,
    fontSize: 14,
  },
});