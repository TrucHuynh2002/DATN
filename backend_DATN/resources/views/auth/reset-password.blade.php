@extends('layout.layout_acount')
@section('title', 'Đổi mật khẩu')
@section('main_acount')

<div class="logo-header" data-background-color="blue">				
				<a href="/" class="logo">
					<img style="width: 100%; height:200px; margin-top: -550px; margin-left: -60px;" src="/img/logo.PNG" alt="logo" class="logo">
				</a>
			</div>
    <form style="margin-left: -450px;" method="POST" action="{{ route('password.update') }}">
        <!-- Password Reset Token -->
        <input type="hidden" name="token" value="{{$token}}">
        <input id="email"  class="form-control" placeholder="Email" type="hidden" name="email"  value="{{$email ? $email : old('email')}}">

        @csrf
        <h1>Đặt lại mật khẩu</h1>
         <!-- Validation Errors -->
        {{-- <x-auth-validation-errors class="mb-4" :errors="$errors" /> --}}

        {{-- <div class="form-group">
            <label for="email">Email*</label>
            <input id="email" class="form-control" placeholder="Email" type="email" name="email" :value="old('email', $request->email)" required autofocus>
        </div> --}}
    
        <div class="form-group">
            <label for="pwd">Mật khẩu mới*</label>
            <input class="form-control" placeholder="Mật khẩu" id="pwd" type="password" name="password" required>
        </div> 
      
        
        <div class="form-group">
            <label for="password_confirmation">Xác nhận mật khẩu*</label>
            <input class="form-control" placeholder="Xác nhận mật khẩu" id="password_confirmation" type="password"
            name="password_confirmation" required>
            @error('password_confirmation')
            <span style="color:red">{{$message}}</span>
            @enderror
            @error('password')
            <span style="color:red">{{$message}}</span>
            @enderror
        </div> 
       

        <button style="width:100%;" type="submit" value="submit" class="btn btn-primary">{{ __('Đặt lại mật khẩu') }}</button>		
    </form>
    
@endsection