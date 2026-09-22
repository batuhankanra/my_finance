import { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import BalanceCard from "@/components/balanceCard" 
import TransactionItem from '@/components/TransactionItem';
import FilterModal from '@/components/FilterModal';
import { TransactionFilters } from '@/types/transaction';
import { useGetTransactionsQuery } from '@/store/api/transactionApi';

export default function TransactionListScreen() {
  const [filters, setFilters] = useState<TransactionFilters>({});
  const [modalVisible, setModalVisible] = useState(false);

  const { data, isLoading, isError, refetch } = useGetTransactionsQuery(filters);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const handleClear = () => {
    setFilters({});
    setModalVisible(false);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Veriler yüklenirken bir hata oluştu.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BalanceCard
        balance={data?.balance ?? 0}
        totalIncome={data?.totalIncome ?? 0}
        totalExpense={data?.totalExpense ?? 0}
      />

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.filterButtonText}>
            Filtrele{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/add')}>
          <Text style={styles.addButtonText}>+ Yeni İşlem</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data?.data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <TransactionItem item={item} />}
        contentContainerStyle={styles.listContent}
        onRefresh={refetch}
        refreshing={isLoading}
        ListEmptyComponent={<Text style={styles.emptyText}>Kayıt bulunamadı.</Text>}
      />

      <FilterModal
        visible={modalVisible}
        initialFilters={filters}
        onClose={() => setModalVisible(false)}
        onApply={(newFilters) => {
          setFilters(newFilters);
          setModalVisible(false);
        }}
        onClear={handleClear}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' },
  errorText: { color: '#EF4444', fontSize: 15 },
  actionRow: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 12, gap: 10 },
  filterButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterButtonText: { color: '#334155', fontWeight: '600', fontSize: 14 },
  addButton: { flex: 1, backgroundColor: '#6366F1', borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  addButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  listContent: { paddingHorizontal: 16, paddingBottom: 24 },
  emptyText: { textAlign: 'center', color: '#94A3B8', marginTop: 40, fontSize: 14 },
});