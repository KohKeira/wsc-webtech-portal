<?php

namespace App\Services;

use Log;
use Prometheus\CollectorRegistry;
use Prometheus\RenderTextFormat;

class PrometheusService
{
    private CollectorRegistry $collectorRegistry;

    public function __construct(CollectorRegistry $registry)
    {
        $this->collectorRegistry = $registry;
    }

    public function metrics(): string
    {
        $renderer = new RenderTextFormat();

        $result = $renderer->render($this->collectorRegistry->getMetricFamilySamples());

        header('Content-type: ' . RenderTextFormat::MIME_TYPE);

        return $result;

    }

    public function incrementLogin ( $token,$count=1 ): void
    {
        Log::info('Increment login count');
        $counter = $this->collectorRegistry->getOrRegisterCounter( 'wsc_webtech', 'login_count', 'Total number of login attempts', [ 'user_type' ] );

        $counter->incBy( $count, [ $token ] );

    }

}