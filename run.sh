if docker ps -a | grep atits_pc
then
	docker rm -f atits_pc
fi
if docker images | grep zhaoliu09/atits_pc
then
	docker rmi -f zhaoliu09/atits_pc
fi
docker build -t zhaoliu09/atits_pc .
docker run --name atits_pc -p 80:8080 -e JAVA_OPTS=-Duser.timezone=Asia/Shanghai --restart always -d zhaoliu09/atits_pc
docker login --username=zhaoliu09 --password=Zhaoliu09
docker push zhaoliu09/atits_pc
