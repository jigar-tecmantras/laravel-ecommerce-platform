<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>Order Confirmation</title>
</head>
<body style='font-family: Arial, sans-serif;'>
    <h1>Order {{ $order->id }} confirmed</h1>
    <p>Hi {{ $customer->full_name ?? $customer->email }},</p>
    <p>Thanks for shopping with us. Here is a snapshot of your order:</p>
    <ul>
        @foreach($order->items as $item)
            <li>{{ $item->quantity }} × {{ $item->product?->name ?? 'Unknown product' }} — {{ number_format($item->total_price, 2) }} {{ $order->currency }}</li>
        @endforeach
    </ul>
    <p><strong>Total:</strong> {{ number_format($order->total, 2) }} {{ $order->currency }}</p>
    <p>We will notify you once the shipment leaves our warehouse.</p>
</body>
</html>
