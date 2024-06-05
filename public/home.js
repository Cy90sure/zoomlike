document.addEventListener('DOMContentLoaded', () => {
   const generateRoomCodeButton = document.getElementById('generateRoomCode')
   const roomCodeInput = document.getElementById('roomCode')
   const createForm = document.getElementById('create_form')

   const generateRoomCode = () => {
      fetch('/generate-room-code')
         .then(response => response.json())
         .then(data => {
            roomCodeInput.value = data.roomCode
         })
         .catch(error => console.error('Error generating room code:', error))
   }

   generateRoomCodeButton.addEventListener('click', generateRoomCode)

   createForm.addEventListener('submit', (event) => {
      event.preventDefault()
      const roomCode = roomCodeInput.value
      if (roomCode) {
         window.location.href = `/${roomCode}`
      }
   })

   generateRoomCode()
})
