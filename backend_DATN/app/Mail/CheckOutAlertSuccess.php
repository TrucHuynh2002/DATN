<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CheckOutAlertSuccess extends Mailable
{
    use Queueable, SerializesModels;
    private $user;
    // private $admin;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        $this->user = $user;
        // $this->admin = $admin;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Trả phòng thành công')->view('email.SendMailCheckOutAlertSuccess')->with(['user'=>$this->user]);
    }
}
