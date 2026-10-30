import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { db } from '../database/db';

export default function NuevoProductoScreen() {
	const [nombre, setNombre] = useState('');
	const [codigoBarras, setCodigoBarras] = useState('');
	const [cantidad, setCantidad] = useState('');
	const [precioCompra, setPrecioCompra] = useState('');
	const [precioVenta, setPrecioVenta] = useState('');

	const guardarProducto = () => {
		if (!nombre.trim()) {
			Alert.alert('Error', 'El nombre del producto es obligatorio');
			return;
		}

		try {
			db.runSync(
				'INSERT INTO productos (nombre, codigo_barras, cantidad, precio_compra, precio_venta) VALUES (?, ?, ?, ?, ?)',
				[
					nombre.trim(),
					codigoBarras.trim(),
					parseInt(cantidad) || 0,
					parseFloat(precioCompra) || 0,
					parseFloat(precioVenta) || 0,
				],
			);
			Alert.alert('Éxito', 'Producto guardado correctamente');
			router.back(); // Volver a la pantalla anterior
		} catch (error) {
			console.error('Error al guardar producto:', error);
			Alert.alert('Error', 'No se pudo guardar el producto');
		}
	};

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.content}
		>
			<View style={styles.imagePlaceholder}>
				<Ionicons
					name="grid"
					size={80}
					color="#E0D4FC"
				/>
			</View>

			<View style={styles.actions}>
				<TouchableOpacity style={styles.iconButton}>
					<Ionicons
						name="image"
						size={24}
						color="#888"
					/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.iconButton}>
					<Ionicons
						name="camera"
						size={24}
						color="#888"
					/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.iconButton}>
					<Ionicons
						name="trash"
						size={24}
						color="#888"
					/>
				</TouchableOpacity>
			</View>

			<Text style={styles.label}>Nombre</Text>
			<TextInput
				style={styles.input}
				value={nombre}
				onChangeText={setNombre}
				placeholder="Ej: Camiseta"
			/>

			<Text style={styles.label}>Código de barras (opcional)</Text>
			<TextInput
				style={styles.input}
				value={codigoBarras}
				onChangeText={setCodigoBarras}
				placeholder="Ej: 123456789"
				keyboardType="numeric"
			/>

			<View style={styles.row}>
				<View style={{ flex: 1, marginRight: 10 }}>
					<Text style={styles.label}>Cantidad</Text>
					<TextInput
						style={styles.input}
						value={cantidad}
						onChangeText={setCantidad}
						placeholder="0"
						keyboardType="numeric"
					/>
				</View>
				<View style={{ flex: 1 }}>
					<Text style={styles.label}>Piezas</Text>
					<TextInput
						style={[styles.input, { backgroundColor: '#eee' }]}
						editable={false}
						value="Piezas"
					/>
				</View>
			</View>

			<Text style={styles.label}>Precio de compra</Text>
			<TextInput
				style={styles.input}
				value={precioCompra}
				onChangeText={setPrecioCompra}
				placeholder="0.00"
				keyboardType="numeric"
			/>

			<Text style={styles.label}>Precio de venta</Text>
			<TextInput
				style={styles.input}
				value={precioVenta}
				onChangeText={setPrecioVenta}
				placeholder="0.00"
				keyboardType="numeric"
			/>

			<TouchableOpacity
				style={styles.saveButton}
				onPress={guardarProducto}
			>
				<Text style={styles.saveButtonText}>Guardar</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff' },
	content: { padding: 20 },
	imagePlaceholder: { alignItems: 'center', marginBottom: 15 },
	actions: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 15,
		marginBottom: 20,
	},
	iconButton: { backgroundColor: '#F5F5F5', padding: 12, borderRadius: 50 },
	label: { fontSize: 14, color: '#666', marginBottom: 5, marginTop: 10 },
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
		marginBottom: 10,
	},
	row: { flexDirection: 'row' },
	saveButton: {
		backgroundColor: '#D3D3D3',
		padding: 18,
		borderRadius: 15,
		alignItems: 'center',
		marginTop: 20,
	},
	saveButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
});
