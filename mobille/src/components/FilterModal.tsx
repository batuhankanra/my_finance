import { Categories } from '@/constants/categories';
import { TransactionFilters, TransactionType } from '@/types/transaction';
import { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'


interface FilterModalProps {
    visible:boolean
    initialFilters:TransactionFilters
    onClose:()=>void
    onApply:(filters:TransactionFilters)=>void
    onClear:()=>void
}


const FilterModal = ({initialFilters,onApply,onClear,onClose,visible}:FilterModalProps) => {
    const [draftType, setDraftType] = useState<TransactionType | undefined>(undefined);
    const [draftCategory, setDraftCategory] = useState<string | undefined>(undefined);
    const [draftStartDate, setDraftStartDate] = useState<Date | undefined>(undefined);
    const [draftEndDate, setDraftEndDate] = useState<Date | undefined>(undefined);
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    useEffect(()=>{
        if (visible){
            setDraftType(initialFilters.type)
            setDraftCategory(initialFilters.category)
            setDraftStartDate(initialFilters.startDate ? new Date(initialFilters.startDate) : undefined)
            setDraftEndDate(initialFilters.endDate ? new Date(initialFilters.endDate) : undefined)
        }
    },[visible,initialFilters])

    const availableCategories=useMemo(()=>{
        if (!draftType) return [...Categories.income, ...Categories.expense];
        return Categories[draftType];
    },[draftType])

    const handleTypeSelect =(type:TransactionType)=>{
        setDraftType(prev=>(prev===type ? undefined : type))
        setDraftCategory(undefined)
    }
    const handleApply = () => {
        onApply({
        type: draftType,
        category: draftCategory,
        startDate: draftStartDate?.toISOString(),
        endDate: draftEndDate?.toISOString(),
        });
    };

    return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.modalTitle}>Filtrele</Text>

            <Text style={styles.modalLabel}>Tür</Text>
            <View style={styles.typeSwitch}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  draftType === 'expense' && styles.typeButtonActiveExpense,
                ]}
                onPress={() => handleTypeSelect ('expense')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    draftType === 'expense' && styles.typeButtonTextActive,
                  ]}
                >
                  Gider
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  draftType === 'income' && styles.typeButtonActiveIncome,
                ]}
                onPress={() => handleTypeSelect('income')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    draftType === 'income' && styles.typeButtonTextActive,
                  ]}
                >
                  Gelir
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLabel}>Kategori</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
              {availableCategories.map((c) => {
                const active = draftCategory === c.value;
                return (
                  <TouchableOpacity
                    key={c.value}
                    style={[
                      styles.chip,
                      { borderColor: c.color },
                      active && { backgroundColor: c.color },
                    ]}
                    onPress={() => setDraftCategory(active ? undefined : c.value)}
                  >
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>
                      {c.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <Text style={styles.modalLabel}>Başlangıç Tarihi</Text>
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowStartPicker(true)}>
              <Text style={styles.dateButtonText}>
                {draftStartDate ? draftStartDate.toLocaleDateString('tr-TR') : 'Seçilmedi'}
              </Text>
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                value={draftStartDate ?? new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowStartPicker(Platform.OS === 'ios');
                  if (selectedDate) setDraftStartDate(selectedDate);
                }}
              />
            )}

            <Text style={styles.modalLabel}>Bitiş Tarihi</Text>
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowEndPicker(true)}>
              <Text style={styles.dateButtonText}>
                {draftEndDate ? draftEndDate.toLocaleDateString('tr-TR') : 'Seçilmedi'}
              </Text>
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                value={draftEndDate ?? new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowEndPicker(Platform.OS === 'ios');
                  if (selectedDate) setDraftEndDate(selectedDate);
                }}
              />
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.clearButton} onPress={onClear}>
                <Text style={styles.clearButtonText}>Temizle</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                <Text style={styles.applyButtonText}>Uygula</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

export default FilterModal

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '85%',
  },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#1E293B', marginBottom: 16 },
  modalLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
    marginTop: 12,
  },
  typeSwitch: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
    padding: 4,
  },
  typeButton: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  typeButtonActiveExpense: { backgroundColor: '#EF4444' },
  typeButtonActiveIncome: { backgroundColor: '#22C55E' },
  typeButtonText: { fontSize: 14, fontWeight: '600', color: '#64748B' },
  typeButtonTextActive: { color: '#FFFFFF' },
  chipRow: { flexDirection: 'row' },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1.5,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  chipText: { fontSize: 13, fontWeight: '600', color: '#334155' },
  chipTextActive: { color: '#FFFFFF' },
  dateButton: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  dateButtonText: { fontSize: 15, color: '#1E293B' },
  modalActions: { flexDirection: 'row', gap: 10, marginTop: 24 },
  clearButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  clearButtonText: { color: '#64748B', fontWeight: '600', fontSize: 14 },
  applyButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#6366F1',
  },
  applyButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  closeButton: { alignItems: 'center', paddingVertical: 14, marginTop: 4 },
  closeButtonText: { color: '#94A3B8', fontSize: 13, fontWeight: '600' },
});