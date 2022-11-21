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
<<<<<<< HEAD
        return $this->subject('Quên mật khẩu')->view('email.Sendmailforgotpassword')->with(['token'=>$this->token],['user'=>$this->user]);
=======
        // dd($this->user);
        return $this->subject('Quên mật khẩu')->view('email.Sendmailforgotpassword')->with(['token'=>$this->token,'user'=>$this->user]);
>>>>>>> 947f0dc62d240f9b2f61da0277a5efc46bf6c4b0
    }
}
