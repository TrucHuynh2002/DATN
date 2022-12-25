<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RatePostNotification extends Notification
{
    use Queueable;
    public $User;
    // public $in_object;
    public $User_two;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($User_two,$User)
    {
        $this->User_two = $User_two;
        $this->User = $User;
        // $this->RoomNumber = $RoomNumber;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    // public function toMail($notifiable)
    // {
    //     return (new MailMessage)
    //                 ->line('The introduction to the notification.')
    //                 ->action('Notification Action', url('/'))
    //                 ->line('Thank you for using our application!');
    // }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'user_two' => $this->User_two,
            'user' => $this->User,
            // 'replyCmt' => $this->in_object,
            // 'roomnumber' => $this->RoomNumber
        ];
    }
}
