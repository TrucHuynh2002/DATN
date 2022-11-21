@extends('layout.layout_acount')
@section('title', 'Quên mật khẩu')
@section('main_acount')
<div class="boydy">
<div class="logo-header" data-background-color="blue">				
				<a href="/" class="logo">
					<img style="width: 100%; height:200px; margin-top: -100px;" src="/img/logo.PNG" alt="logo" class="logo">
				</a>
			</div>
    <form style="padding: 30px;" method="POST" action="{{ route('password.email') }}">
        @csrf
        <h1>Quên mật khẩu</h1>
        <!-- Session Status -->
        <x-auth-session-status class="mb-4" :status="session('status')" />

        <!-- Validation Errors -->
        {{-- <x-auth-validation-errors class="mb-4" :errors="$errors" /> --}}
        @if (session('message'))
            <p class="text-success">
                {{session('message')}}
            </p>
        @endif
        @if (session('error'))
            <p class="text-danger">
                {{session('error')}}
            </p>
        @endif
        <div class="form-group">
            <label for="email">Email*</label>
            <input class="form-control" placeholder="Email của bạn" id="email" type="email" name="email" :value="old('email')" required autofocus>
        </div>

        <button  style="width: 100%;" type="submit" value="submit" class="btn btn-primary">{{ __('Đặt lại mật khẩu') }}</button>	
    </form></div>
@endsection