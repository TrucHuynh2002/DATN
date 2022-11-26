@extends('layout.layout_acount')
@section('title', 'Đăng nhập')
@section('main_acount')
    <div class="boydy">
        <div class="logo-header" data-background-color="blue">
            <a href="/" class="logo">
                <img style="width: 100%; height:200px; margin-top: -100px;" src="/img/logo.PNG" alt="logo" class="logo">
            </a>
        </div>
        <form style="padding: 30px;" method="POST" action="{{ route('login') }}">
            @csrf
            <h2>Đăng Nhập</h2>
            <!-- Session Status -->
            <x-auth-session-status class="mb-4" :status="session('status')" />

            <!-- Validation Errors -->
            <x-auth-validation-errors class="mb-4" :errors="$errors" />

            <div class="form-group">
                <label for="email">Email*</label>
                <input class="form-control" placeholder="Email" id="email" type="email" name="email"
                    :value="old('email')" required autofocus>
            </div>

            <div class="form-group">
                <label for="pwd">Mật khẩu*</label>
                <input class="form-control" placeholder="Mật khẩu" id="pwd" type="password" name="password" required
                    autocomplete="current-password">
            </div>

            <div class="block mt-4">
                <label for="remember_me" class="inline-flex items-center">
                    <input id="remember_me" type="checkbox"
                        class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        name="remember">
                    <span class="ml-2 text-sm text-gray-600">{{ __('Nhớ mật khẩu') }}</span>
                </label>
            </div>
            <button style="width: 100%;" type="submit" value="submit"
                class="btn btn-primary">{{ __('Đăng nhập') }}</button>
            <center>
                <div class="form-group">
                    @if (Route::has('password.request'))
                        <a class="nderline text-sm text-gray-600 hover:text-gray-900"
                            href="{{ route('password.request') }}">
                            {{ __('Quên mật khẩu?') }}
                        </a>
                    @endif
                </div>
            </center>
        </form>
    </div>
@endsection
