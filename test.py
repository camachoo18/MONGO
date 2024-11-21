import requests

# 1. Test para obtener todos los juegos (GET /juegos)
def test_get_juegos():
    response = requests.get('http://localhost:3000/juegos')
    assert response.status_code == 200
    print("GET /juegos - Test Passed!")

# 2. Test para crear un nuevo juego (POST /juegos)
def test_post_juego(titulo, desarrolladora, fecha_lanzamiento, plataformas):
    response = requests.post('http://localhost:3000/juegos', json={
        'titulo': titulo,
        'Desarrolladora': desarrolladora,
        'Fecha-Lanzamiento': fecha_lanzamiento,
        'Plataformas': plataformas
    })
    assert response.status_code == 201
    print(f"POST /juegos - Juego '{titulo}' creado exitosamente!")

# 3. Test para actualizar un juego por título (PUT /juegos/{titulo})
def test_put_juego(titulo_actual, titulo_nuevo, desarrolladora_nueva, fecha_lanzamiento_nueva, plataformas_nuevas):
    response = requests.put(f'http://localhost:3000/juegos/{titulo_actual}', json={
        'titulo': titulo_nuevo,
        'Desarrolladora': desarrolladora_nueva,
        'Fecha-Lanzamiento': fecha_lanzamiento_nueva,
        'Plataformas': plataformas_nuevas
    })
    assert response.status_code == 200
    print(f"PUT /juegos/{titulo_actual} - Juego actualizado a '{titulo_nuevo}'!")

# 4. Test para eliminar un juego por título (DELETE /juegos/{titulo})
def test_delete_juego(titulo):
    response = requests.delete(f'http://localhost:3000/juegos/{titulo}')
    assert response.status_code == 204
    print(f"DELETE /juegos/{titulo} - Juego eliminado exitosamente!")

# Ejecución de las pruebas
def run_tests():
    print("Iniciando pruebas de la API...\n")
    
    # Test GET todos los juegos
    test_get_juegos()
    
    # Test POST crear un nuevo juego
    test_post_juego('The Legend of Zelda', 'Nintendo', '1986-02-21', ['NES', 'Switch'])
    
    # Test PUT actualizar el juego
    test_put_juego('The Legend of Zelda', 'The Legend of Zelda: Ocarina of Time', 'Nintendo', '1998-11-21', ['N64', 'Switch'])
    
    # Test DELETE eliminar el juego
    test_delete_juego('The Legend of Zelda: Ocarina of Time')


if __name__ == "__main__":
    run_tests()
