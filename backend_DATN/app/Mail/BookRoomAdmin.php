<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BookRoomAdmin extends Mailable
{
    use Queueable, SerializesModels;
    private $user;
    // private $token;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        $this->user = $user;
        // $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Có người đặt phòng')->view('email.SendMailBookingAdmin')->with(['user' => $this->user]);
    }
}
