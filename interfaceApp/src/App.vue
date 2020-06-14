<template>
  <v-app style="background: #eee;">
    
    <NavBar/>
    <Toolbar/>
    <Views/>
    
      
  <div class="item doctor" style="padding-right:20%">
    <div class="splitscreen">


<template v-for="(item,index) in chats">
        
        <Chat v-bind:key ="item" style="width: 300px; height:350px; margin-right:20px"

        :participants="item.participants"
        :myself="myself"
        :messages="item.messages"
        :chat-title="chatTitle"
        :placeholder="placeholder"
        :colors="colors"
        :border-style="borderStyle"
        :hide-close-button="hideCloseButton"
        :close-button-icon-size="closeButtonIconSize"
        :submit-icon-size="submitIconSize"
        :submit-image-icon-size="submitImageIconSize"
        :load-more-messages="toLoad.length > 0 ? loadMoreMessages : null"
        :async-mode="asyncMode"
        :scroll-bottom="scrollBottom"
        :display-header="true"
        :send-images="true"
        :profile-picture-config="profilePictureConfig"
        :timestamp-config="timestampConfig"
        @onImageClicked="onImageClicked"
        @onImageSelected="onImageSelected"
        @onMessageSubmit="(message) => {onMessageSubmit(message,item,index)}"
        @onType="onType(item)"
        @onClose="onCloses(index)"/>

        </template>
        
        </div>
         </div>
        
          

  <v-navigation-drawer
      v-model="drawerRight"
      app
      clipped
      right
    >
          <v-list subheader >
      <v-subheader>Recent chat</v-subheader>

      <v-list-item
        v-for="item in conversas"
        :key="item.idConversa"
        @click="abrirChat(item)"
      >
        <v-list-item-avatar>
          <v-img src='https://cdn.vuetifyjs.com/images/lists/1.jpg'></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.participantes[1].nome"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
        <!--  <v-icon :color="item.active ? '#900000' : 'grey'">mdi-message</v-icon> -->
        <v-icon color='#900000'>mdi-message</v-icon> 
        </v-list-item-icon>
      </v-list-item>
    </v-list>

    </v-navigation-drawer>


    
  </v-app>
</template>

<script>
import NavBar from '@/components/Navbar.vue'
import Toolbar from '@/components/Toolbar.vue'
import Views from '@/components/View.vue'
import { Chat } from 'vue-quick-chat'
import 'vue-quick-chat/dist/vue-quick-chat.css';
import axios from "axios"
import io from "socket.io-client";
var socket = io.connect("http://localhost:3050",{query:"idUtilizador=lguilhermem@hotmail.com"});
export default {
    components: {
    NavBar,
    Toolbar,
    Views,
    Chat
  },
     data() {
        return {
          userID :"lguilhermem@hotmail.com",
          chats:[],
          conversas: [],

           items: [
        { active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
      items2: [
        { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
      ],
       participants: [
        {
          name: 'Arnaldo',
          id: 1
        },
        {
          name: 'José',
          id: 2
        }
      ],
      myself: {
        name: 'Matheus S.',
        id: 3
      },
            visible: true,
            participants: [
                {
                    name: 'Arnaldo',
                    id: 1,
                    profilePicture: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/NafSadh_Profile.jpg/768px-NafSadh_Profile.jpg'
                },
                {
                    name: 'José',
                    id: 2,
                    profilePicture: 'https://lh3.googleusercontent.com/-G1d4-a7d_TY/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJPez_wX5UCJztzEUeCxOd7HBK7-jA.CMID/s83-c/photo.jpg'
                }
            ],
            myself: {
                name: this.userID,
                id: this.userID,
                profilePicture: 'https://lh3.googleusercontent.com/-G1d4-a7d_TY/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJPez_wX5UCJztzEUeCxOd7HBK7-jA.CMID/s83-c/photo.jpg'
            },
            messages: [
                {
                    content: 'received messages',
                    myself: false,
                    participantId: 1,
                    timestamp: {year: 2019, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123},
                    type: 'text'
                },
                {
                    content: 'sent messages',
                    myself: true,
                    participantId: 3,
                    timestamp: {year: 2019, month: 4, day: 5, hour: 19, minute: 10, second: 3, millisecond: 123},
                    type: 'text'
                },
                {
                    content: 'other received messages',
                    myself: false,
                    participantId: 2,
                    timestamp: {year: 2019, month: 5, day: 5, hour: 10, minute: 10, second: 3, millisecond: 123},
                    type: 'text'
                }
            ],
            chatTitle: '',
            placeholder: 'Mensagem...',
            colors: {
                header: {
                    bg: '#d30303',
                    text: '#fff'
                },
                message: {
                    myself: {
                        bg: '#fff',
                        text: '#bdb8b8'
                    },
                    others: {
                        bg: '#fb4141',
                        text: '#fff'
                    },
                    messagesDisplay: {
                        bg: '#f7f3f3'
                    }
                },
                submitIcon: '#b91010',
                submitImageIcon: '#b91010',
            },
            borderStyle: {
                topLeft: "10px",
                topRight: "10px",
                bottomLeft: "10px",
                bottomRight: "10px",
            },
            hideCloseButton: false,
            submitIconSize: 25,
            closeButtonIconSize: "20px",
            asyncMode: false,
            toLoad: [
                {
                    content: 'Hey, John Doe! How are you today?',
                    myself: false,
                    participantId: 2,
                    timestamp: {year: 2011, month: 3, day: 5, hour: 10, minute: 10, second: 3, millisecond: 123},
                    uploaded: true,
                    viewed: true,
                    type: 'text'
                },
                {
                    content: "Hey, Adam! I'm feeling really fine this evening.",
                    myself: true,
                    participantId: 3,
                    timestamp: {year: 2010, month: 0, day: 5, hour: 19, minute: 10, second: 3, millisecond: 123},
                    uploaded: true,
                    viewed: true,
                    type: 'text'
                },
            ],
            scrollBottom: {
                messageSent: true,
                messageReceived: false
            },
            displayHeader:true,
            profilePictureConfig: {
                others: true,
                myself: true,
                styles: {
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%'
                }
            },
            timestampConfig: {   
                format: 'HH:mm',
                relative: false
            }
        }
    },

    created: async function(){
    try {
    this.myself.name = "Luís Martins"
    this.myself.id = this.userID
      let response = await axios.get("http://localhost:3050/api/conversas/participante/"+ this.userID )
      this.conversas = response.data
    } catch (e) {

    }


  socket.on("mensagem", msg => {
    console.log("MENSAGEM RECEBIDA")
    console.log(msg)
      var newM = {}
      newM.content = msg.texto
      newM.type = 'text'
      newM.participantId = msg.from
      newM.timestamp = "" 
      this.chats[1].messages.push(newM)  
  })

  },
    methods: {
        onType: function (conversa) {
            //here you can set any behavior
            //console.log(conversa)
        },
        loadMoreMessages(resolve) {
            setTimeout(() => {
                resolve(this.toLoad); //We end the loading state and add the messages
                //Make sure the loaded messages are also added to our local messages copy or they will be lost
                this.messages.unshift(...this.toLoad);
                this.toLoad = [];
            }, 1000);
        },
        onMessageSubmit: function (message,chat,index) {
          console.log(chat)
          console.log(message)
            /*
            * example simulating an upload callback. 
            * It's important to notice that even when your message wasn't send 
            * yet to the server you have to add the message into the array
            */
            this.chats[index].messages.push(message);
                       var data = {}
            data.to = chat.participants[0]; /// MUDAR COM SESSOES
            data.idConversa = chat.idConversa;
            data.texto = message.content
            data.from = this.userID;
            socket.emit('mensagem', data)
            
 
            /*
            * you can update message state after the server response
            */
            // timeout simulating the request
            setTimeout(() => {
                message.uploaded = true
            }, 2000)
        },
        onCloses(index) {
          this.chats.splice(index,1)
            
        },
        onImageSelected(files, message){
            let src = 'https://149364066.v2.pressablecdn.com/wp-content/uploads/2017/03/vue.jpg'
            this.messages.push(message);
            /**
             * This timeout simulates a requisition that uploads the image file to the server.
             * It's up to you implement the request and deal with the response in order to
             * update the message status and the message URL
             */
            setTimeout((res) => {
                message.uploaded = true
                message.src = res.src
            }, 3000, {src});
        },
        onImageClicked(message){
            /**
             * This is the callback function that is going to be executed when some image is clicked.
             * You can add your code here to do whatever you need with the image clicked. A common situation is to display the image clicked in full screen.
             */
            console.log('Image clicked', message.src)
        },
        parseParticipantes(participantes){
            var newParticipantes = []
            participantes.forEach(e =>{
              if(e.participante != this.userID){
              var newP = {}
              newP.name = e.nome
              newP.id = e.participante
              newParticipantes.push(newP)
              }
            })
            return newParticipantes;
        },
        parseMessage(messages){
          var newMessages = []
            messages.forEach(m => {
              var newM = {}
              newM.content = m.texto
              newM.type = 'text'
              newM.participantId = m.remetente
              newM.timestamp = m.dataEnvio 
              if(m.remetente == this.userID)
                newM.myself = true
              else 
                newM.myself = false
              newMessages.push(newM)
            });
            return newMessages
        },
        chatExiste(idConversa){
          var result = false;
          this.chats.forEach(e => {
            if(e.idConversa == idConversa)
              result = true
          })
          return result
        },
        abrirChat(item){
          if(this.chatExiste(item.idConversa))
            return;
          var chat = {}
          chat.idConversa = item.idConversa
          chat.messages = this.parseMessage(item.mensagens) 
          chat.participants = this.parseParticipantes(item.participantes) 
          if(this.chats.length >= 3)
            this.chats.splice(2,1)
          this.chats.push(chat)
        }
    }
  }
</script>


<style lang="scss">
@import '@/styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}

$material-light: (
  'background': #fff
);

.teste {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;

  height: 400px;
}

.doctor {
  position: -webkit-sticky;
  position: sticky;
  bottom: 1rem;
  align-self: flex-end;
}

.splitscreen {
    display:flex;
}
.splitscreen .left {
    flex: 1;
}
.splitscreen .right {
    flex: 1;
}

.message-content{
    width:100%;
}
</style>

