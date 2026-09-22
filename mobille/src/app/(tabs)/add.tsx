

import { Categories } from '@/constants/categories';
import { useCreateTransactionMutation } from '@/store/api/transactionApi';
import { TransactionType } from '@/types/transaction';
import { router } from 'expo-router';
import React, { useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Add = () => {
    const [type,setType]=useState<TransactionType>('expense');
    const [category,setCategory]=useState(Categories.expense[0].value)
    const [amount,setAmount]=useState<string>('')
    const [description,setDescription]=useState<string>('')
    const [date,setDate]=useState(new Date())

    const [createTransaction,{isLoading}]=useCreateTransactionMutation()


    const handleTypeChange=(newType:TransactionType)=>{
        setType(newType)
        setCategory(Categories[newType][0].value)
    }

    const handleSubmit=async ()=>{
        const parsedAmount =parseFloat(amount.replace(",","."))
        if (!amount || isNaN(parsedAmount) || parsedAmount<=0){
            Alert.alert("error","Plase enter a valid amount")
            return
        }
        try{
            await createTransaction({type,amount:parsedAmount,description:description.trim()|| undefined,date:date.toString(),category}).unwrap();
            setAmount('');
            setDescription('');
            setDate(new Date());
            setType('expense');
            setCategory(Categories.expense[0].value)
            router.push("/(tabs)")
        }catch{}
    }
    
    return (
         <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Yeni İşlem</Text>

      {/* Tip seçici */}
      <View style={styles.typeSwitch}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            type === 'expense' && styles.typeButtonActiveExpense,
          ]}
          onPress={() => handleTypeChange('expense')}
        >
          <Text
            style={[
              styles.typeButtonText,
              type === 'expense' && styles.typeButtonTextActive,
            ]}
          >
            Gider
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeButton,
            type === 'income' && styles.typeButtonActiveIncome,
          ]}
          onPress={() => handleTypeChange('income')}
        >
          <Text
            style={[
              styles.typeButtonText,
              type === 'income' && styles.typeButtonTextActive,
            ]}
          >
            Gelir
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tutar */}
      <Text style={styles.label}>Tutar</Text>
      <View style={styles.amountWrapper}>
        <TextInput
          style={styles.amountInput}
          value={amount}
          onChangeText={setAmount}
          placeholder="0"
          placeholderTextColor="#CBD5E1"
          keyboardType="decimal-pad"
        />
        <Text style={styles.currency}>₺</Text>
      </View>

      {/* Kategori - chip listesi */}
      <Text style={styles.label}>Kategori</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipRow}
        contentContainerStyle={{ paddingRight: 8 }}
      >
        {Categories[type].map((c) => {
          const active = c.value === category;
          return (
            <TouchableOpacity
              key={c.value}
              style={[
                styles.chip,
                { borderColor: c.color },
                active && { backgroundColor: c.color },
              ]}
              onPress={() => setCategory(c.value)}
            >
              <Text
                style={[
                  styles.chipText,
                  active && styles.chipTextActive,
                ]}
              >
                {c.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Tarih */}
      <Text style={styles.label}>Tarih</Text>
      <View style={styles.dateRow}>
        
      </View>

      {/* Açıklama */}
      <Text style={styles.label}>Açıklama (opsiyonel)</Text>
      <TextInput
        style={styles.descriptionInput}
        value={description}
        onChangeText={setDescription}
        placeholder="Örn: Market alışverişi"
        placeholderTextColor="#CBD5E1"
        multiline
      />

      {/* Kaydet */}
      <TouchableOpacity
        style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={styles.submitButtonText}>
          {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 20,
  },
  typeSwitch: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  typeButtonActiveExpense: {
    backgroundColor: '#EF4444',
  },
  typeButtonActiveIncome: {
    backgroundColor: '#22C55E',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  typeButtonTextActive: {
    color: '#FFFFFF',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
    marginTop: 4,
  },
  amountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  amountInput: {
    flex: 1,
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    paddingVertical: 14,
  },
  currency: {
    fontSize: 20,
    fontWeight: '600',
    color: '#94A3B8',
  },
  chipRow: {
    marginBottom: 20,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1.5,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#1E293B',
    marginRight: 10,
  },
  todayButton: {
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  todayButtonText: {
    color: '#6366F1',
    fontWeight: '700',
    fontSize: 13,
  },
  descriptionInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#1E293B',
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 28,
  },
  submitButton: {
    backgroundColor: '#6366F1',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Add