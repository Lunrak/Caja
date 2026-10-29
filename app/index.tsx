import React from 'react';
import Drawer from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
	return (
		<Drawer
			screenOptions={{
				headerStyle: { backgroundColor: '#1A1A1A' }, // Fondo oscuro de la barra superior
				headerTintColor: '#fff', // Texto blanco en la barra
				drawerActiveTintColor: '#8A2BE2', // Color morado para el ítem seleccionado
				drawerLabelStyle: { fontSize: 16 },
			}}
		>
			<Drawer.Screen
				name="index"
				options={{
					title: 'Nueva venta',
					drawerIcon: ({ color }) => (
						<Ionicons
							name="calculator-outline"
							size={24}
							color={color}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="ventas"
				options={{
					title: 'Ventas',
					drawerIcon: ({ color }) => (
						<Ionicons
							name="receipt-outline"
							size={24}
							color={color}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="productos"
				options={{
					title: 'Productos',
					drawerIcon: ({ color }) => (
						<Ionicons
							name="grid-outline"
							size={24}
							color={color}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="proveedores"
				options={{
					title: 'Proveedores',
					drawerIcon: ({ color }) => (
						<Ionicons
							name="car-outline"
							size={24}
							color={color}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="clientes"
				options={{
					title: 'Clientes',
					drawerIcon: ({ color }) => (
						<Ionicons
							name="person-outline"
							size={24}
							color={color}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="reportes"
				options={{
					title: 'Reportes',
					drawerIcon: ({ color }) => (
						<Ionicons
							name="bar-chart-outline"
							size={24}
							color={color}
						/>
					),
				}}
			/>
		</Drawer>
	);
}
