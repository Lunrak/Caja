import React, { useState, useCallback } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { db } from '../database/db';

export default function ReportesScreen() {
	const [totalProductos, setTotalProductos] = useState(0);
	const [valorInventario, setValorInventario] = useState(0);
	const [totalVentas] = useState(0);
	const [totalGanancias] = useState(0);

	const cargarDatos = () => {
		try {
			// Contar productos
			const resultProductos = db.getFirstSync<{ count: number }>(
				'SELECT COUNT(*) as count FROM productos',
			);
			setTotalProductos(resultProductos?.count || 0);

			// Sumar el valor del inventario (cantidad * precio_compra)
			const resultInventario = db.getFirstSync<{ total: number }>(
				'SELECT SUM(cantidad * precio_compra) as total FROM productos',
			);
			setValorInventario(resultInventario?.total || 0);
		} catch (error) {
			console.error('Error al cargar reportes:', error);
		}
	};

	useFocusEffect(
		useCallback(() => {
			cargarDatos();
		}, []),
	);

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.content}
		>
			{/* Tarjeta Ganancias */}
			<TouchableOpacity style={styles.card}>
				<View style={styles.cardHeader}>
					<Text style={styles.cardTitle}>Ganancias</Text>
					<Ionicons
						name="arrow-forward"
						size={24}
						color="#000"
					/>
				</View>
				<Text style={styles.cardAmount}>${totalGanancias.toFixed(2)}</Text>
				<Text style={styles.cardSubtitle}>Ganancias de hoy</Text>
			</TouchableOpacity>

			{/* Tarjeta Ventas */}
			<TouchableOpacity style={styles.card}>
				<View style={styles.cardHeader}>
					<Text style={styles.cardTitle}>Ventas</Text>
					<Ionicons
						name="arrow-forward"
						size={24}
						color="#000"
					/>
				</View>
				<Text style={styles.cardAmount}>${totalVentas.toFixed(2)}</Text>
				<Text style={styles.cardSubtitle}>Ventas de hoy</Text>
			</TouchableOpacity>

			{/* Tarjeta Inventario */}
			<TouchableOpacity style={styles.card}>
				<View style={styles.cardHeader}>
					<Text style={styles.cardTitle}>Inventario</Text>
					<Ionicons
						name="arrow-forward"
						size={24}
						color="#000"
					/>
				</View>
				<Text style={styles.cardAmount}>${valorInventario.toFixed(2)}</Text>
				<Text style={styles.cardSubtitle}>Valor total del inventario</Text>
			</TouchableOpacity>

			{/* Tarjeta Productos */}
			<TouchableOpacity style={styles.card}>
				<View style={styles.cardHeader}>
					<Text style={styles.cardTitle}>Productos</Text>
					<Ionicons
						name="arrow-forward"
						size={24}
						color="#000"
					/>
				</View>
				<Text style={styles.cardAmount}>{totalProductos}</Text>
				<Text style={styles.cardSubtitle}>Productos registrados</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#F5F5F5' },
	content: { padding: 20, gap: 15 },
	card: {
		backgroundColor: '#fff',
		borderRadius: 15,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	cardHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
	},
	cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },
	cardAmount: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#B088F9',
		marginBottom: 5,
	},
	cardSubtitle: { fontSize: 14, color: '#999' },
});
