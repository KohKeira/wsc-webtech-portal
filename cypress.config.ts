import { exec } from 'child_process';
import { defineConfig } from 'cypress';
import coverageTask from "@cypress/code-coverage/task";



export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:8000',
        setupNodeEvents(on, config) {
            coverageTask(on, config)
            on('task', {
                artisanMigrateFreshSeed() {
                    return new Promise((resolve, reject) => {
                        exec(
                            'php artisan migrate:fresh --seed',
                            (error, stdout, stderr) => {
                                if (error) {
                                    console.error(`Error: ${stderr}`);
                                    return reject(stderr);
                                }
                                console.log(`Output: ${stdout}`);
                                resolve(stdout);
                            },
                        );
                    });
                },
            });
            return config
        },
    },
});
