import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductosScreen() {
	return (
		<View style={styles.container}>
			<View style={styles.emptyState}>
				<Ionicons
					name="grid"
					size={80}
					color="#E0D4FC"
				/>
				<Text style={styles.emptyText}>Sin productos</Text>
			</View>

			<TouchableOpacity style={styles.fab}>
				<Ionicons
					name="add"
					size={32}
					color="#fff"
				/>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff' },
	emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	emptyText: { fontSize: 18, color: '#888', marginTop: 15 },
	fab: {
		position: 'absolute',
		bottom: 30,
		right: 30,
		backgroundColor: '#B088F9',
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
	},
});
