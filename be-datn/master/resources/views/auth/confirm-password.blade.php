@extends('layout.layout_acount')
@section('title', 'Xác nhận mật khẩu')
@section('main_acount')

   
<div class="boydy-forgot">
<div class="logo-header" data-background-color="blue">				
				<a href="/" class="logo">
					<img style="width: 100%; height:200px; margin-top: -100px;" src="/img/logo.PNG" alt="logo" class="logo">
				</a>
			</div>
    <form style="padding: 30px;" method="POST" action="{{ route('password.confirm') }}">
        @csrf
        <h1>Xác nhận mật khẩu</h1>

        <!-- Validation Errors -->
        <x-auth-validation-errors class="mb-4" :errors="$errors" />

        <div class="form-group">
            <label for="pwd">Mật khẩu*</label>
            <input class="form-control" placeholder="Password" id="pwd" type="password" name="password"
            required autocomplete="current-password">
        </div>

        <button  style="width: 100%;" type="submit" value="submit" class="form-submit">{{ __('Confirm') }}</button>
    </form></div>
@endsection