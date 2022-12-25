<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ReplyUpdateRoomDelete extends Notification
{
    use Queueable;
    // public $post;
    // public $in_object;
    // public $User_two;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->post = $post;
        // $this->in_object = $replyComment;
        // $this->User_two = $User_two;
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
            // 'post' => $this->post,
            // 'user' => $this->User,
            // 'replyCmt' => $this->in_object,
            // 'user_two' => $this->User_two
        ];
    }
}
