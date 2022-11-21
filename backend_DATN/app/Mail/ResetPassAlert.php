<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPassAlert extends Mailable
{
    use Queueable, SerializesModels;
    private $user ;
    private $token ;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user,$token)
    {
        $this->user = $user;
        $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        // dd($this->user);
        return $this->subject('Quên mật khẩu')->view('email.Sendmailforgotpassword')->with(['token'=>$this->token,'user'=>$this->user]);
    }
}
