<?php

namespace App\Services\Integration;

use App\Mail\OrderConfirmationMail;
use App\Models\Order;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class NotificationHub
{
    public static function sendOrderNotifications(Order $order): void
    {
        $order->loadMissing(['customer', 'items.product']);

        Mail::to($order->customer->email)
            ->queue(new OrderConfirmationMail($order));

        static::sendSms($order->customer->phone, "Your order #{$order->id} has been received.");
    }

    protected static function sendSms(?string $phone, string $message): void
    {
        if (! $phone) {
            Log::warning('SMS skipped - phone absent', ['order' => $message]);
            return;
        }

        Log::info('SMS dispatched', ['phone' => $phone, 'message' => $message]);
    }
}
