<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BillNotification extends Notification
{
    use Queueable;
    public $bill;
    // public $in_object;
    // public $RoomNumber;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($bill)
    {
        $this->bill = $bill;
        // $this->in_object = $replyComment;
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
            'bill' => $this->bill,
            // 'replyCmt' => $this->in_object,
            // 'roomnumber' => $this->RoomNumber
        ];
    }
}
