import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function VentasScreen() {
	return (
		<View style={styles.container}>
			<Ionicons
				name="receipt"
				size={80}
				color="#E0D4FC"
			/>
			<Text style={styles.emptyText}>Sin ventas</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyText: { fontSize: 18, color: '#888', marginTop: 15 },
});
