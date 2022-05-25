using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure.Messaging.ServiceBus;

namespace SkillMapLab.Tags
{
    public class Program
    {
        static string connectionString = "Endpoint=sb://skillmap-tags.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=k1Gcw1UiQOlR7Ba9DI/I+yEiVZPVYci2DEagJ7k6gfo=";
        static string queueName = "tags";
        static ServiceBusClient client;
        static ServiceBusSender sender;
        static ServiceBusProcessor processor;
        private const int numOfMessage = 3;

        public static async Task Main()
        {
            client = new ServiceBusClient(connectionString);
            sender=client.CreateSender(queueName);
            processor=client.CreateProcessor(queueName, new ServiceBusProcessorOptions());

            using ServiceBusMessageBatch messageBatch = await sender.CreateMessageBatchAsync();
            for(int i = 0; i < numOfMessage; i++)
            {
                if(!messageBatch.TryAddMessage(new ServiceBusMessage($"New Message {i}")))
                {
                    throw new Exception($"The message {i} is too large to fit in the batch.");
                }

            }

            try
            {
                await sender.SendMessagesAsync(messageBatch);
                Console.WriteLine($"A batch of {numOfMessage} have been sent");
            }
            finally
            {
                await sender.DisposeAsync();
            }


            try
            {
                processor.ProcessMessageAsync += MessageHandlerAsync;
                processor.ProcessErrorAsync += ErrorHandler;

                // start processing 
                await processor.StartProcessingAsync();

                Console.WriteLine("Wait for a minute and then press any key to end the processing");
                Console.ReadKey();

                // stop processing 
                Console.WriteLine("\nStopping the receiver...");
                await processor.StopProcessingAsync();
                Console.WriteLine("Stopped receiving messages");
            }
            finally
            {
                // Calling DisposeAsync on client types is required to ensure that network
                // resources and other unmanaged objects are properly cleaned up.
                await processor.DisposeAsync();
                await client.DisposeAsync();
            }

            //CreateHostBuilder(args).Build().Run();
        }

        static async Task MessageHandlerAsync(ProcessMessageEventArgs args)
        {
            string body = args.Message.Body.ToString();
            Console.WriteLine($"Received: {body}"); 

            await args.CompleteMessageAsync(args.Message);  
        }

        static Task ErrorHandler(ProcessErrorEventArgs args)
        {
            Console.WriteLine(args.Exception.ToString());
            return Task.CompletedTask;
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
