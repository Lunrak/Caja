import React, { useState, useEffect } from 'react';
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
import { router, useLocalSearchParams } from 'expo-router';
import { db } from '../database/db';

export default function NuevoProductoScreen() {
	const { id } = useLocalSearchParams<{ id?: string }>();
	const esEdicion = !!id;

	const [nombre, setNombre] = useState('');
	const [codigoBarras, setCodigoBarras] = useState('');
	const [cantidad, setCantidad] = useState('');
	const [precioCompra, setPrecioCompra] = useState('');
	const [precioVenta, setPrecioVenta] = useState('');

	useEffect(() => {
		if (esEdicion) {
			const producto = db.getFirstSync<any>(
				'SELECT * FROM productos WHERE id = ?',
				[Number(id)],
			);
			if (producto) {
				setNombre(producto.nombre);
				setCodigoBarras(producto.codigo_barras || '');
				setCantidad(producto.cantidad.toString());
				setPrecioCompra(producto.precio_compra.toString());
				setPrecioVenta(producto.precio_venta.toString());
			}
		}
	}, [id]);

	const guardarProducto = () => {
		if (!nombre.trim()) {
			Alert.alert('Error', 'El nombre del producto es obligatorio');
			return;
		}

		try {
			if (esEdicion) {
				db.runSync(
					'UPDATE productos SET nombre = ?, codigo_barras = ?, cantidad = ?, precio_compra = ?, precio_venta = ? WHERE id = ?',
					[
						nombre.trim(),
						codigoBarras.trim(),
						parseInt(cantidad) || 0,
						parseFloat(precioCompra) || 0,
						parseFloat(precioVenta) || 0,
						Number(id),
					],
				);
			} else {
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
			}
			router.back();
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
			<Text style={styles.title}>
				{esEdicion ? 'Editar producto' : 'Nuevo producto'}
			</Text>

			<Text style={styles.label}>Nombre</Text>
			<TextInput
				style={styles.input}
				value={nombre}
				onChangeText={setNombre}
				placeholder="Ej: Camiseta"
			/>

			<Text style={styles.label}>Código de barras</Text>
			<TextInput
				style={styles.input}
				value={codigoBarras}
				onChangeText={setCodigoBarras}
				placeholder="Opcional"
				keyboardType="numeric"
			/>

			<Text style={styles.label}>Cantidad</Text>
			<TextInput
				style={styles.input}
				value={cantidad}
				onChangeText={setCantidad}
				placeholder="0"
				keyboardType="numeric"
			/>

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
	title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' },
	label: { fontSize: 14, color: '#666', marginBottom: 5, marginTop: 10 },
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
		marginBottom: 10,
	},
	saveButton: {
		backgroundColor: '#B088F9',
		padding: 18,
		borderRadius: 15,
		alignItems: 'center',
		marginTop: 20,
	},
	saveButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
});
