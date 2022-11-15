import { Component, IterableDiffers } from '@angular/core';
import { NavController, ToastController, AlertController, IonItem } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  title = "Grocery";

  items = [
    {
      name: "Milk",
      quantity: 2
    },
    {
      name: "Bread",
      quantity: 1
    },
    {
      name: "Banana",
      quantity: 3
    },
    {
      name: "Sugar",
      quantity: 1
    },
  ]
  dataService: any;


  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private alertController: AlertController, private socialSharing: SocialSharing) {}


// different from video - found answer here - https://forum.ionicframework.com/t/toast-present-is-not-a-function/155889
  async removeItem(item, index) {
    console.log("Removing Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message:`Removing Item: ` + item.name + "...",
      duration: 3000
    });
    toast.present();
    
// remove this code?
    this.items.splice(index, 1);

    this.dataService.removeItem(index);
  }



  async shareItem(item, index) {
    console.log("Share Item: ", item, index);
    const toast = await this.toastCtrl.create({
      message: 'Sharing Item: ' + item.name + '...',
      duration: 3000
    });
    toast.present();

    let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries app";

        // Check if sharing via email is supported
    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Shared Successfully!");
            // Sharing via email is not possible
    }).catch((error) => {
      console.error("Error while sharing...", error);
    });
  }

  //   // Share via email
  //   this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
  //     // Success!
  //   }).catch(() => {
  //     // Error!
  //   });
  // }




  async editItem(item, index) {
    console.log("Edit Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message:`Editing Item: ` + item.name + "...",
      duration: 3000
    });
    toast.present();
    this.showEditItemPrompt(item, index);
  }

  async showEditItemPrompt(item, index) {
    console.log("Edit Item... ");
    const alert = await this.alertController.create({
      header: 'Please Edit Item',
      inputs: [
        {
          name: 'name',
          placeholder: 'Item Name',
          value: item.name
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item.quantity,
          attributes: {
            maxlength: 4,
          },
          
        },
      ],
      buttons: [
        {
          text:'Cancel',
          handler: data => {
            console.log('Cancel clicked')
          }
        }, 
        {
          text:'Save',
          handler: item => {
            console.log('Saved clicked', item);
            this.items[index] = item;
          }
        }
      ]
    });
  
    await alert.present();
  }




  addItem() {
    console.log("Adding Item");
    this.presentAlert();
  }

// code from https://ionicframework.com/docs/api/alert
  async presentAlert() {
    console.log("Adding Item... ");
    const alert = await this.alertController.create({
      header: 'Add Grocery Item',
      inputs: [
        {
          name: 'name',
          placeholder: 'Item Name',
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          attributes: {
            maxlength: 4,
          },
        },
      ],
      buttons: [
        {
          text:'Cancel',
          handler: data => {
            console.log('Cancel clicked')
          }
        }, 
        {
          text:'Save',
          handler: item => {
            console.log('Saved clicked', item);
            this.items.push(item);
          }
        }
      ]
    });

    await alert.present();
  }
}



