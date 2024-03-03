import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image } from 'react-native';

const App = () => {
  const [viagem, setViagem] = useState(null);
  const [erro, setErro] = useState(null);
  const [tituloPesquisa, setTituloPesquisa] = useState('');
  const [buscando, setBuscando] = useState(false);
  const [imagemUrl, setImagemUrl] = useState('');

  useEffect(() => {
    if (buscando && tituloPesquisa.trim() !== '') {
      const fetchViagem = async () => {
        try {
          const response = await fetch(`https://localhost:44374/api/Viagem?titulo=${encodeURIComponent(tituloPesquisa)}&exato=true`);
          if (!response.ok) {
            throw new Error('Erro ao buscar viagem');
          }
          const data = await response.json();
          if (data.length > 0 && data[0].titulo === tituloPesquisa) {
            setViagem(data[0]);
            setImagemUrl('https://cdn.pixabay.com/photo/2020/03/03/20/31/boat-4899802_1280.jpg');
            setErro(null);
          } else {
            setViagem(null);
            setErro('Nenhuma viagem encontrada');
          }
        } catch (error) {
          console.error(error.message);
          setViagem(null);
          setErro('Erro ao buscar viagem');
        } finally {
          setBuscando(false);
        }
      };

      fetchViagem();
    }
  }, [buscando]);

  const handleBuscar = () => {
    if (tituloPesquisa.trim() !== '') {
      setBuscando(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agência de Viagem</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar por título"
          value={tituloPesquisa}
          onChangeText={setTituloPesquisa}
        />
        <Button title="Buscar" onPress={handleBuscar} color="#10004F" />
      </View>
      {viagem && (
        <View style={styles.card}>
          <Image source={{ uri: imagemUrl }} style={styles.imagem} />
          <Text style={[styles.cardText,styles.valorText]}>Título: {viagem.titulo}</Text>
          <Text style={[styles.cardText,styles.valorText]}>Descrição: {viagem.descricao}</Text>
          <Text style={[styles.cardText, styles.valorText]}>Valor: R$ <Text style={styles.valorLaranja}>{viagem.valor.toFixed(2)}</Text></Text>
          <Text style={[styles.cardText, styles.valorText]}>Data de Partida: {viagem.dataPartida}</Text>
        </View>
      )}
      {erro && (
        <Text style={[styles.cardText, styles.errorText]}>{erro}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    marginRight: 10,
    borderRadius: 5,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
    width: '80%',
  },
  cardText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
    backgroundColor: '#10004F',
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
  },
  imagem: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  valorText: {
    fontWeight: 'bold',
  },
  valorLaranja: {
    color: 'orange',
  },
});

export default App;
