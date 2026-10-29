import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          title: 'Nueva Venta',
          drawerIcon: ({ color }) => <Ionicons name="cart" size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="productos"
        options={{
          title: 'Productos',
          drawerIcon: ({ color }) => <Ionicons name="cube" size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="clientes"
        options={{
          title: 'Clientes',
          drawerIcon: ({ color }) => <Ionicons name="people" size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="reportes"
        options={{
          title: 'Reportes',
          drawerIcon: ({ color }) => <Ionicons name="bar-chart" size={24} color={color} />,
        }}
      />
    </Drawer>
  );
}