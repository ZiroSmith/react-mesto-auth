import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Header.js';
import Register from "./Register";
import Login from "./Login";
import NotFound from "./NotFound";
import ProtectedRoute from './ProtectedRoute'
import Main from './Main.js';
import Footer from './Footer.js';
import { api } from "../utils/Api";
import InfoTooltip from './InfoTooltip.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser , setCurrentUser ] = React.useState({});
  const [cards, setCards] = React.useState([]);


  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData)
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards([...res]);
      })
      .catch((err) => console.log(err));
  }, []);


  function handleAddPlaceSubmit(data) {
    api
    .addCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => console.log(`${err}`))
  }

  function handleUpdateUser(data) {
    api
    .editUserInfo(data)
    .then((newData) => {
      setCurrentUser(newData);
      closeAllPopups();
    })
    .catch(err => console.log(`${err}`))
  }

  function handleUpdateAvatar(data) {
    api
    .editAvatar(data)
    .then((newData) => {
      setCurrentUser(newData);
      closeAllPopups();
    })
    .catch(err => console.log(`${err}`))
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => console.log(`${err}`));
    }


  function handleCardDelete (card) {
    api.removeCard(card._id)
      .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    }).catch(err => console.log(`${err}`))
  }


  const handleCardClick = (cardData) => {
    setSelectedCard({
      open: 'popup_opened',
      link: cardData.link,
      name: cardData.name
    });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header />
          <Routes>
            <Route path="/sign-up" element={<Register />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute 
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onEditProfile={handleEditProfileClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        <Footer />
        <InfoTooltip onClose={closeAllPopups}/>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser ={handleUpdateUser}
        />
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar ={handleUpdateAvatar}
        />
        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups} />
      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
