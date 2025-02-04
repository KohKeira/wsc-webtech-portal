<?php

namespace App\Http\Controllers;

use App\Services\PrometheusService;
use Illuminate\Http\Request;

class PrometheusController extends Controller
{
    private PrometheusService $service;

    public function __construct(PrometheusService $service)
    {
        $this->service = $service;
    }

    public function metrics(): string
    {
        return $this->service->metrics();
    }

}
