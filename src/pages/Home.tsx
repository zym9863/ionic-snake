import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Snake from '../components/Snake';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage className="home-page">
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      <IonHeader className="home-header">
        <IonToolbar>
          <IonTitle>🐍 贪吃蛇游戏</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen className="home-content">
        <IonHeader collapse="condense" className="home-header">
          <IonToolbar>
            <IonTitle size="large">🐍 贪吃蛇游戏</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Snake />
      </IonContent>
    </IonPage>
  );
};

export default Home;
