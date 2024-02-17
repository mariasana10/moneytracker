import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomToolbar from './BottomToolBar';
import Menu from './navigationDrawer';
import { useNavigation } from '@react-navigation/native';

const Layout = ({ children, title, FooterContent, bottomToolBar, showBackIcon }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigation = useNavigation()

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleBackPress = () => {
        navigation.goBack()
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    {showBackIcon ? (
                        <TouchableOpacity onPress={handleBackPress}>
                            <Ionicons style={{ paddingBottom: '8%', paddingRight: 15 }} name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                    ) : (<TouchableOpacity onPress={toggleSidebar}>
                        <Ionicons style={{ paddingBottom: '8%', paddingRight: 15 }} name="menu" size={24} color="black" />
                    </TouchableOpacity>)}
                    <TouchableOpacity>
                        <Text style={styles.headerText}>{title}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>{children}</View>
                {FooterContent &&
                    <View style={styles.footer}>{FooterContent}</View>}

                {sidebarOpen && (
                    <View style={styles.sidebar}>
                        {/* Sidebar content goes here */}
                        <Menu />
                    </View>
                )}
            </View>
            {bottomToolBar && <BottomToolbar updateMenuState={toggleSidebar} setSidebarOpen={setSidebarOpen} />}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'scroll',
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#add8e6',
        paddingTop: '15%',
        paddingHorizontal: 15,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        paddingBottom: '8%',
    },
    content: {
        flex: 1,
    },
    footer: {
        backgroundColor: '#f2f2f2',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sidebar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 150, // Customize the height of the sidebar as needed
        backgroundColor: '#fff',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
        zIndex: 1, // Ensure the sidebar is displayed above other content
    },
});

export default Layout;
