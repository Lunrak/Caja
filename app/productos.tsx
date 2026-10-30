import React, { useState, useCallback } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { db } from '../database/db';

type Producto = {
	id: number;
	nombre: string;
	cantidad: number;
	precio_venta: number;
};

export default function ProductosScreen() {
	const [productos, setProductos] = useState<Producto[]>([]);

	const cargarProductos = () => {
		try {
			const result = db.getAllSync<Producto>(
				'SELECT * FROM productos ORDER BY nombre ASC',
			);
			setProductos(result);
		} catch (error) {
			console.error('Error al cargar productos:', error);
		}
	};

	useFocusEffect(
		useCallback(() => {
			cargarProductos();
		}, []),
	);

	const renderItem = ({ item }: { item: Producto }) => (
		<View style={styles.card}>
			<View style={styles.cardInfo}>
				<Text style={styles.cardTitle}>{item.nombre}</Text>
				<Text style={styles.cardSubtitle}>
					Stock: {item.cantidad} | Precio: ${item.precio_venta.toFixed(2)}
				</Text>
			</View>
			<TouchableOpacity style={styles.editButton}>
				<Ionicons
					name="pencil"
					size={20}
					color="#B088F9"
				/>
			</TouchableOpacity>
		</View>
	);

	return (
		<View style={styles.container}>
			{productos.length === 0 ? (
				<View style={styles.emptyState}>
					<Ionicons
						name="grid"
						size={80}
						color="#E0D4FC"
					/>
					<Text style={styles.emptyText}>Sin productos</Text>
				</View>
			) : (
				<FlatList
					data={productos}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderItem}
					contentContainerStyle={styles.listContent}
				/>
			)}

			<TouchableOpacity
				style={styles.fab}
				onPress={() => router.push('/nuevo-producto')}
			>
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
	container: { flex: 1, backgroundColor: '#F5F5F5' },
	emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	emptyText: { fontSize: 18, color: '#888', marginTop: 15 },
	listContent: { padding: 15, paddingBottom: 100 },
	card: {
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 15,
		marginBottom: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	cardInfo: { flex: 1 },
	cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
	cardSubtitle: { fontSize: 13, color: '#777', marginTop: 4 },
	editButton: { padding: 10, backgroundColor: '#F8F5FF', borderRadius: 8 },
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
