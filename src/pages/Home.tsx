import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Snake from '../components/Snake';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>贪吃蛇游戏</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">贪吃蛇游戏</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Snake />
      </IonContent>
    </IonPage>
  );
};

export default Home;
