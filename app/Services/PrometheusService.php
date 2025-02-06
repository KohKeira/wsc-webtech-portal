<?php

namespace App\Services;

use Log;
use Prometheus\CollectorRegistry;
use Prometheus\RenderTextFormat;

class PrometheusService
{
    private CollectorRegistry $collectorRegistry;
    private const NAMESPACE = 'wsc_webtech';

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

    // auth metrics
    public function incrementLogin($token, $count = 1): void
    {
        Log::info('Increment login count');
        $counter = $this->collectorRegistry->getOrRegisterCounter(self::NAMESPACE , 'login_count', 'Total number of login attempts', ['user_type']);

        $counter->incBy($count, [$token]);
    }
    public function incrementFailedLogin($count = 1): void
    {
        $counter = $this->collectorRegistry->getOrRegisterCounter(self::NAMESPACE , 'failed_login_count', 'Total number of failed login attempts');

        $counter->incBy($count);

    }

    public function incrementUnauthorisedAttempts($count = 1): void
    {
        $counter = $this->collectorRegistry->getOrRegisterCounter(self::NAMESPACE , 'unathorised_attempts', 'Total number of  unathorised attempts');

        $counter->incBy($count);

    }

    // user activity
    public function setActiveUserCount($token,$count = 1,$action='inc'): void
    {
        $gauge =  $this->collectorRegistry->getOrRegisterGauge(self::NAMESPACE, 'active_users', 'Total number of active users', ['user_type']);
        if($action==='inc'){
            $gauge->incBy($count, [$token]);
        }else{
            $gauge->decBy($count, [$token]);
        }
    }

    public function setTrainingCountCount($weekNumber, $module, $userType, $action = 'inc' ,$count = 1): void
    {
        $gauge =  $this->collectorRegistry->getOrRegisterGauge(self::NAMESPACE, 'trainings_count', 'Total number of training sessions', ['week_number','module','user_type']);
        if($action==='inc'){
            $gauge->incBy($count, [$weekNumber,$module,$userType]);
        }else{
            $gauge->decBy($count, [$weekNumber,$module,$userType]);
        }
    }

}