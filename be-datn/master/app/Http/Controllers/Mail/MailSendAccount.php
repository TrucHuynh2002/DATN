<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MailSendAccount extends Mailable
{
    use Queueable, SerializesModels;
    private $hoten_sv ;
    private $email ;
    private $password ;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($hoten_sv,$email,$password)
    {
        $this->hoten_sv = $hoten_sv;
        $this->email = $email;
        $this->password = $password;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('['.env('APP_NAME').'] CHÀO MỪNG BẠN ĐẾN VỚI CÔNG TY')->view('email.Sendmailthuctapsinh')
        ->with(['email'=>$this->email, 'password'=>$this->password, 'hoten_sv'=>$this->hoten_sv]);
    }
}
