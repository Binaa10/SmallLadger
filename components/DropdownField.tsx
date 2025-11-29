import React, { useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors, spacing, typography } from "~/theme";

type DropdownFieldProps = {
  label?: string;
  placeholder?: string;
  options: string[];
  value?: string;
  onChange: (value: string | undefined) => void;
};

export default function DropdownField({
  label,
  placeholder = "Select",
  options,
  value,
  onChange,
}: DropdownFieldProps) {
  const [visible, setVisible] = useState(false);

  const displayValue = useMemo(
    () => value ?? placeholder,
    [value, placeholder]
  );

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  const handleSelect = (option: string) => {
    onChange(option);
    closeModal();
  };

  const handleClear = () => {
    onChange(undefined);
    closeModal();
  };

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Pressable style={styles.field} onPress={openModal}>
        <Text
          style={[styles.value, !value && styles.placeholder]}
          numberOfLines={1}
        >
          {displayValue}
        </Text>
        <Feather
          name={visible ? "chevron-up" : "chevron-down"}
          size={20}
          color={colors.muted}
        />
      </Pressable>

      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={closeModal}
      >
        <Pressable style={styles.backdrop} onPress={closeModal}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {label ?? "Select an option"}
              </Text>
              {value ? (
                <Pressable onPress={handleClear} hitSlop={8}>
                  <Text style={styles.clearText}>Clear</Text>
                </Pressable>
              ) : null}
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.optionRow}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                  {value === item ? (
                    <Feather name="check" size={18} color={colors.primary} />
                  ) : null}
                </Pressable>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              bounces={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  label: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: "600",
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: "#1f252f",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#313949",
  },
  value: {
    flex: 1,
    color: colors.text,
    fontSize: typography.body,
  },
  placeholder: {
    color: colors.muted,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(6, 12, 24, 0.75)",
    justifyContent: "flex-end",
    padding: spacing.lg,
  },
  modalCard: {
    backgroundColor: "#0f1725",
    borderRadius: 24,
    padding: spacing.lg,
    gap: spacing.md,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "700",
  },
  clearText: {
    color: colors.primary,
    fontWeight: "600",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
  },
  optionText: {
    color: colors.text,
    fontSize: typography.body,
  },
  separator: {
    height: 1,
    backgroundColor: "#1c2633",
  },
});
