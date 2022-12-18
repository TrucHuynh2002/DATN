<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CheckOut extends Mailable
{
    use Queueable, SerializesModels;
    private $user;
    private $admin;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($admin,$user)
    {
        $this->user = $user;
        $this->admin = $admin;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Có người trả phòng')->view('email.SendMailCheckOut')->with(['admin'=>$this->admin,'user'=>$this->user]);
    }
}
