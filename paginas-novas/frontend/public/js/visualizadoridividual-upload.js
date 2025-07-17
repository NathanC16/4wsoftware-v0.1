// paginas-novas/frontend/public/js/visualizadoridividual-upload.js

document.addEventListener('DOMContentLoaded', () => {
  const uploadForm = document.getElementById('upload-form');
  if (uploadForm) {
    uploadForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const profilePicInput = document.getElementById('profilePic');
      if (profilePicInput.files.length === 0) {
        alert('Por favor, selecione um arquivo.');
        return;
      }

      const formData = new FormData();
      formData.append('profilePic', profilePicInput.files[0]);

      const userId = 'USER_ID_HERE'; // Substitua pelo ID do usuário logado

      try {
        const response = await fetch(`/api/user/upload-profile-pic/${userId}`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          alert(result.message);
          // Atualize a imagem de perfil na página, se necessário
        } else {
          alert('Erro ao fazer upload da imagem.');
        }
      } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor.');
      }
    });
  }
});
