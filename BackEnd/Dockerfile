FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app


COPY *.sln ./
COPY ShoppingListApi/*.csproj ./ShoppingListApi/
COPY BL/*.csproj ./BL/
COPY DAL/*.csproj ./DAL/

RUN dotnet restore

COPY . .
WORKDIR /app/ShoppingListApi
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/ShoppingListApi/out .

EXPOSE $PORT
ENTRYPOINT ["dotnet", "ShoppingListApi.dll"]
