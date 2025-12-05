import type { WidgetConfigurationEntity } from "@/domain/configuration/widget.configuration.entity";


/**
 * Interface defining a service to manage the configuration of a widget.
 * This service provides methods to load and save widget configuration data.
 */
export interface ConfigurationRepositoryInterface {

    /**
     * Loads the configuration for the widget asynchronously.
     * Retrieves the widget configuration data from the source, which may involve
     * accessing a remote service or a local data store.
     *
     * @return {Promise<WidgetConfigurationEntity | null>} A promise that resolves to the widget configuration object if available, or null if no configuration exists.
     */
    loadConfiguration(): Promise<WidgetConfigurationEntity | null>;

    /**
     * Saves the provided widget configuration.
     *
     * @param {WidgetConfigurationEntity} config - The widget configuration object to be saved.
     * @return {Promise<void>} A promise that resolves when the configuration is successfully saved.
     */
    saveConfiguration(config: WidgetConfigurationEntity): Promise<void>;
}